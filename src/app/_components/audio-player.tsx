interface AudioPlayerProps {
  src: string
}

const AudioPlayer = ({ src }: AudioPlayerProps) => {
  return (
    <div className="audio-player flex w-full flex-col gap-2 rounded-md border border-gray-300 bg-gray-100 p-4 dark:border-gray-600 dark:bg-gray-800">
      <div>
        <p>Prefer audio format? Listen to the blog post below:</p>
        <audio controls className="w-full" src={src}>
          <track kind="captions" label="English captions" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  )
}

export default AudioPlayer
