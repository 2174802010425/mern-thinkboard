import { useParams } from "react-router";
export default function DeleteNote () {
    const {id} = useParams()
    return (
        <div>
            delete {id}
        </div>
    )
}