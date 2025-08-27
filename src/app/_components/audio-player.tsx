interface AudioPlayerProps {
  src: string
}

const AudioPlayer = ({ src }: AudioPlayerProps) => {
  return (
    <div className="audio-player p-4 rounded-md flex flex-col gap-2 bg-gray-100 border border-gray-300 dark:bg-gray-800 dark:border-gray-600 w-full">
      <div>
        <p>Prefer audio format? Listen to the blog post below:</p>
        <audio controls src={src} className="w-full">
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  )
}

export default AudioPlayer
