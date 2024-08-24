import ClientBox from "./clientBox"


function ClientList({clientData}) {
    return<>
    { clientData.map((client, index)=><ClientBox {...client} key={"client-box"+index}/>)}
    </>
}

export default ClientList