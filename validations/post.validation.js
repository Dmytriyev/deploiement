import joi from "joi";

export default function postValidation(body){
    const postCreate = joi.object({
      titre: joi.string(),
      contenu: joi.string()
    })

    const postUpdate = joi.object({
      titre: joi.string(),
      contenu: joi.string()
    })

    return {
        postCreate: postCreate.validate(body),
        postUpdate: postUpdate.validate(body),
    }
}
