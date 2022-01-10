import IUser from "../interfaces/user";



export const validate = async (callback: (error: string | null, user: IUser | null | any) => void ) => {
    
    const url = 'http://localhost:1337/api/auth'

    const request = new Request(url,{
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include'
    })

    try 
    {
        fetch(request)
            .then((res) => {
                if(res.status === 200)
                {
                    res.json()
                        .then ( (json) => {
                            callback(null,json)
                        } )
                    
                }
                else 
                {
                    res.json()
                        .then ((json) => {
                            callback('Invalid',json)
                        })
                }
            })
    }
    catch (error)
     {
        callback('Unable to authenticate' , null)
     }
}