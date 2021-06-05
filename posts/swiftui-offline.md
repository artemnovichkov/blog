---
title: 'Working with web content offline in SwiftUI apps'
date: '2021-04-25'
---

<p align="center"/>
  <img src="/images/offline/cover.png"/>
</p>

I continue developing an app for saving and reading articles. In my [previous post](https://blog.artemnovichkov.com/sheet-happens), I covered interesting cases of using sheets in SwiftUI. Now I want to describe my journey with offline mode.

There are situations when users are unable to download web content: bad connection, airplane mode, etc. `WKWebView` has useful APIs for saving its content in different formats. Let's check it out!

> Note: Examples are written in Swift 5.4 and tested on iOS 14.5 with Xcode 12.5 (12E262).

## Preparation

In the app user can save URL content without explicit previewing. To deal with it, we use a simple `WKWebView` wrapper called `WebDataManager`:

```swift
import WebKit

final class WebDataManager: NSObject {
    
    private lazy var webView: WKWebView = {
        let webView = WKWebView()
        webView.navigationDelegate = self
        return webView
    }()
    
    private var completionHandler: ((Result<Data, Error>) -> Void)?
    
    func createData(url: URL, completionHandler: @escaping (Result<Data, Error>) -> Void) {
        self.completionHandler = completionHandler
        webView.load(.init(url: url))
    }
}
```

We create a web view without frame, because we don't want to show it. Also, `WebDataManager` has a convenience function with completion to handle web content. For all formats it will return Data that we can store locally.

To work with web navigation, we must conform `WKNavigationDelegate` and implement `didFinish` and `didFail` functions:

```swift
extension WebDataManager: WKNavigationDelegate {
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        
// save loaded content

    }
    
    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        completionHandler?(.failure(error))
    }
}
```

These functions will be called on navigation changes. Now we are ready to save the content, and our first station will be `takeSnapshot`.

## Snapshots

Since iOS 11.0 `WKWebView` has `takeSnapshot` function. It has an optional WKSnapshotConfiguration to specify a capture behavior. In the final, it returns a generated image.

```swift
// declared in WebDataManager

enum DataError: Error {
    case noImageData
}

func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
    let config = WKSnapshotConfiguration()
    webView.takeSnapshot(with: config) { [weak self] image, error in
        if let error = error {
            self?.completionHandler?(.failure(error))
            return
        }
        guard let pngData = image?.pngData() else {
            self?.completionHandler?(.failure(DataError.noImageData))
            return
        }
        self?.completionHandler?(.success(pngData))
    }
}
```

Remember zero frame of the web view? Because of it, we have an unknown error here:

> Error Domain=WKErrorDomain Code=1 "An unknown error occurred" UserInfo={NSLocalizedDescription=An unknown error occurred}

<p align="center"/>
  <img src="https://media.giphy.com/media/S5n7Wkhhw5A2IrfKER/giphy.gif"/>
</p>

To fix it, we can get a `contentSize` and set it to config's rect:

```swift
config.rect = .init(origin: .zero, size: webView.scrollView.contentSize)
```

Now we have the image data, can save it locally and show in the app:

```swift
import SwiftUI

struct SnapshotContentView: View {
    
    let url: URL
    
    var body: some View {
        if let image = UIImage(contentsOfFile: url.path) {
            ScrollView {
                Image(uiImage: image)
                    .resizable()
                    .scaledToFit()
            }
        }
        else {
            Text("Fail to load image")
        }
    }
}
```

Let's highlight a few cons of this approach:

- Images have fixed sizes and may look bad on different screens;
- We can't copy text from contents and open URLs.

Luckily, the next approach has no these issues.

## PDF

With iOS 14.0 `WKWebView` got a new `createPDF` function. It already returns a `Result` object that we can just pass to our `completionHandler`:

```swift
func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
    webView.createPDF { [weak self] result in
        self?.completionHandler?(result)
    }
}
```

For a record, the function also takes `WKPDFConfiguration` object with the only option — a rect to capture a portion of the web view.

SwiftUI has no views for PDF content. But with helping of `UIViewRepresentable` we can use `PDFView` from `PDFKit` framework:

```swift
import SwiftUI
import PDFKit

struct PDFContentView: UIViewRepresentable {
    
    let url: URL
    
    func makeUIView(context: Context) -> PDFView {
        let view = PDFView()
        view.autoScales = true
        view.document = PDFDocument(url: url)
        return view
    }
    
    func updateUIView(_ pdfView: PDFView, context: Context) {
    }
}
```

Now we can copy text and even open URLs in Safari, but web content is still static. For instance, animations are gone, drop-down lists will be collapsed forever.

## Web archive

The last approach in this article is web archives. A web archive is a file that archives inside it all the content of one web page. And since iOS 14.0 we can work with it easily:

```swift
func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
    webView.createWebArchiveData { [weak self] result in
        self?.completionHandler?(result)
    }
}
```

Of course, we have another wrapper, but for `WKWebView`:

```swift
import SwiftUI
import WebKit

struct WebArchiveContentView: UIViewRepresentable {
    
    let url: URL
    
    func makeUIView(context: Context) -> WKWebView {
        WKWebView()
    }
    
    func updateUIView(_ webView: WKWebView, context: Context) {
        webView.loadFileURL(url, allowingReadAccessTo: url)
    }
}
```

With the magic of web archives web page logic is working as well. With an internet connection, the web view will navigate to tapped content links.

## Conclusion

Finally, for the app I choose web archives, but all approaches are helpful based on app purposes. The last thing I want to add is a size of rendered contents. For my blog's main page the sizes are:

- .png — 1,8 Mb;
- .pdf — 2,3 Mb;
- .webarchive — 5,3 Mb.

I don't mind it (yet 😅), but I'm planning to add features for clearing saved data and download archives for selected articles.

If you want to play with examples and test your URLs, an example project with all three saving options is available [here](https://github.com/artemnovichkov/sheet).

<p align="center"/>
  <img src="/images/offline/example-preview.png"/>
</p>