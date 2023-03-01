---
title: Implementing spoilers in SwiftUI
description: Recreation of spoiler feature from Telegram in SwiftUI
cover: /images/spoiler-view/cover.png
date: '2023-03-01'
author:
  - artem-novichkov
---

Telegram has a spoiler feature that allows you to hide certain parts of your message that could reveal a spoiler. In this article, we will explore how to implement the feature in SwiftUI.

## Dive into source code

If you're interested in exploring Telegram's source code, you'll find that they use the `CAEmitterLayer` and `CAEmitterCell` classes from Core Animation to implement the spoiler effect. `CAEmitterLayer` is a powerful class that allows you to create particle effects like fire, smoke, or snow. In the case of the Telegram spoiler effect, `CAEmitterLayer` is used to generate a cloud of particles that obscure the spoiler text:

```swift
let emitter = CAEmitterCell()
emitter.contents = UIImage(bundleImageName: "Components/TextSpeckle")?.cgImage
emitter.contentsScale = 1.8
emitter.emissionRange = .pi * 2.0
emitter.lifetime = 1.0
emitter.scale = 0.5
emitter.velocityRange = 20.0
emitter.name = "dustCell"
emitter.alphaRange = 1.0
emitter.setValue("point", forKey: "particleType")
emitter.setValue(3.0, forKey: "mass")
emitter.setValue(2.0, forKey: "massRange")
```

We will reuse their configuration, but in final, we want to see something like this:

```swift
import SwiftUI

struct ContentView: View {

    @State var spoilerIsOn = true

    var body: some View {
        Text("Everything will be good")
            .font(.title)
            .spoiler(isOn: $spoilerIsOn)
    }
}
```

## CAEmitterLayer in SwiftUI

We can create a custom `UIView` subclass that's designed specifically to work with `CAEmitterLayer`:

```swift
final class EmitterView: UIView {

    override class var layerClass: AnyClass {
        CAEmitterLayer.self
    }

    override var layer: CAEmitterLayer {
        super.layer as! CAEmitterLayer
    }
}
```

We override the `layerClass` property to specify that the layer for this view should be of type `CAEmitterLayer`. We also override the `layer` property to cast the `super.layer` as a `CAEmitterLayer`, which allows us to access the emitter layer's properties and methods more easily.

Next, we'll use `UIViewRepresentable` wrapper and add required configurations:

```swift
struct SpoilerView: UIViewRepresentable {

    let size: CGSize

    func makeUIView(context: Context) -> EmitterView {
        let emitterView = EmitterView()

        let emitterCell = CAEmitterCell()
        emitterCell.contents = UIImage(named: "textSpeckle_Normal")?.cgImage
        emitterCell.color = UIColor.black.cgColor
        emitterCell.contentsScale = 1.8
        emitterCell.emissionRange = .pi * 2
        emitterCell.lifetime = 1
        emitterCell.scale = 0.5
        emitterCell.velocityRange = 20
        emitterCell.alphaRange = 1
        emitterCell.birthRate = 4000

        emitterView.layer.emitterShape = .rectangle
        emitterView.layer.emitterCells = [emitterCell]

        return emitterView
    }

    func updateUIView(_ uiView: EmitterView, context: Context) {
        uiView.layer.emitterPosition = .init(x: size.width / 2,
                                             y: size.height / 2)
        uiView.layer.emitterSize = size
    }
}
```

The `size` property in `SpoilerView` is used to set the size of the emitter for the particle effect. It's required to set and we can update it in `updateUIView` in case of layout changes.
Of course, we can move all constants to the properties as well, but we hardcode it to simplify the example.

## Modifiers and extensions

We implement a `SpoilerModifier` struct that adds a spoiler to any view. It takes a boolean value to toggle the visibility of the effect.

```swift
struct SpoilerModifier: ViewModifier {

    let isOn: Bool

    func body(content: Content) -> some View {
        content
            .overlay {
                if isOn {
                    GeometryReader { proxy in
                        SpoilerView(size: proxy.size)
                    }
                }
            }
    }
}
```

In this case `GeometryReader` inside the overlay allows us to use `proxy.size` of the hidden content.

We already can use it like a usual modifier:

```swift
import SwiftUI

struct ContentView: View {

    var body: some View {
        Text("Everything will be good")
            .font(.title)
            .opacity(0)
            .modifier(SpoilerModifier(isOn: true))
    }
}
```

Or we can expend `View` protocol and add some useful modifiers:


```swift
extension View {

    func spoiler(isOn: Binding<Bool>) -> some View {
        self
            // 1
            .opacity(isOn.wrappedValue ? 0 : 1)
            // 2
            .modifier(SpoilerModifier(isOn: isOn.wrappedValue))
            // 3
            .animation(.default, value: isOn.wrappedValue)
            // 4
            .onTapGesture {
                isOn.wrappedValue = !isOn.wrappedValue
            }
    }
}
```

Let's discover every line here:

1. Hides the content if the spoiler is on.
2. Adds the modifier with the spoiler modifier.
3. Adds a default animation for smooth transitions between states. The type of the animation we also can pass via parameters to change it from the outside.
4. Add a tap gesture to change the states.

Now we can apply these modifiers to any view in our apps. It doesn't work exactly like in Telegram, because it should overlay every word separately and hide the particles from the tap area. According to `Text` interface in SwiftUI and initial tricky implementation (hello, private API), this solution is simple and flexible enough. If you know how to improve it, feel free to ping me on [Twitter](https://twitter.com/iosartem).

If you want to play with SpoilerView by yourself, check out [SpoilerViewExample](https://github.com/artemnovichkov/SpoilerViewExample) project on Github.

## References

- [Telegram source code](https://github.com/TelegramMessenger/Telegram-iOS)
- [CAEmitter​Layer](https://nshipster.com/caemitterlayer) by [Mattt](https://twitter.com/mattt)
- [SwiftUI-Particles](https://github.com/ArthurGuibert/SwiftUI-Particles) by [ArthurGuibert](https://github.com/ArthurGuibert)
- [EffectsLibrary](https://github.com/GetStream/effects-library) by [Stream](https://twitter.com/getstream_io)