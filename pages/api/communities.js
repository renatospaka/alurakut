import { SiteClient } from "datocms-client";

export default async function requestReceiver(req, res) {
  if (req.method === "POST") {
    const tokenFull = "f72b82321ab461d2cf169c26e894f3"
    const client = SiteClient(tokenFull)

    const newRecord = await client.items.create({
      itemType: "968613",   //id da model criada
      ...req.body,
      // creatorSludg: req.body.creatorSlug,
      // title: req.body.title,
      // imageUrl: req.body.imageUrl,
    })  
    
    return res.json({
      message: "Deu liga.",
      newRecord: newRecord,
    })
  } 

  res.status(404).json({message: "Deu ruim porque não era POST"})
}
