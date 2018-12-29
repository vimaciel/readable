import * as service from '../helpers/api'
import * as uuid from 'uuid'

export const newCommentary = (commentary) => {
    commentary.timestamp = Date.now()
    commentary.id = uuid.v1()  

    return service.post('comments', commentary);
}

export const votingCommentary = (id, vote) => {
    const body = {
        option: vote
    }

    return service.post(`comments/${id}`, body)
}