import db from '../../../lib/firebase'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const ref = db.ref('views').child(req.query.slug)
    const { snapshot } = await ref.transaction((views) => {
      if (views === null) {
        return 1
      }

      return views + 1
    })

    return res.status(200).json({
      total: snapshot.val()
    })
  }

  if (req.method === 'GET') {
    const snapshot = await db.ref('views').child(req.query.slug).once('value')

    return res.status(200).json({
      total: snapshot.val()
    })
  }
}