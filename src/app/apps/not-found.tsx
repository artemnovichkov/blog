import NotFoundContent from "@/app/_components/not-found-content"

/**
 * The apps layout gives promo pages a wide canvas; the 404 prose wants the
 * reading column instead.
 */
export default function AppsNotFound() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <NotFoundContent />
    </div>
  )
}
