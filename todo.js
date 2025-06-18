import { useEffect, useState } from "react"

export default function Todo(){
const[title,setTitle]=useState("")
const[descryption,setDescryption]=useState("")
 const[todos,setTodos]=useState([])
 const[editid,seteditid]=useState(-1);
 const[edittitle,seteditTitle]=useState("")
const[editdescryption,seteditDescryption]=useState("")
 const[error,setError]=useState("");
 const[message,setMessage]=useState("");
 
 const apiUrl="http://localhost:8000"

    const handleSubmit=()=>{
        setError("")
        if(title.trim()!=='' && descryption.trim!==''){
            fetch(apiUrl+"/todos",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({title,descryption})
            }).then((res)=>{
                if(res.ok){
setTodos([...todos,{title,descryption}])
setMessage("ITEM ADDED SUCCESSFULLY")
setTimeout(()=>{
    setMessage("");
},3000)
                }else{
                    setError("unable to create Todo item")

                }

            }).catch(()=>{
                setError("unable to create a todo item")
            })
            //add item to list
            
        }
    }
    useEffect(()=>{
        getitems()
    },[])
            const getitems=()=>{
                fetch(apiUrl +"/todos")
                .then((res)=> res.json())
                .then((res)=>{
                    setTodos(res)
                })
            }
            const handleedit=(item)=>{
                seteditid(item._id) ; seteditTitle(item.title);seteditDescryption(item.descryption)
            }
        const handleUpdate=()=>{
             setError("")
        if(edittitle.trim()!=='' && editdescryption.trim!==''){
            fetch(apiUrl+"/todos/"+editid,{
                method:"PUT",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({title:edittitle,descryption:editdescryption})
            }).then((res)=>{
                if(res.ok){
                   const updatetodos=todos.map((item)=>{
                        if(item._id==editid){
item.title=edittitle;
item.descryption=editdescryption;
                        }
                        return item;
                    })
setTodos(updatetodos)
setMessage("ITEM UPDATED SUCCESSFULLY")
setTimeout(()=>{
    setMessage("");
},3000)
seteditid(-1)
                }else{
                    setError("unable to create Todo item")

                }

            }).catch(()=>{
                setError("unable to create a todo item")
            })
            //add item to list
            
        }


        }
    const handleeditcancel=()=>{
        seteditid(-1)
    }
    const handledelete=(id)=>{
        if(window.confirm('Are you sure want to delete?')){
            fetch(apiUrl+'/todos/'+id,{
                method:"DELETE"
            })
            .then(()=>{
              const updatetodos=  todos.filter((item)=>item._id!==id)
              setTodos(updatetodos)
            })
        }

    }
   
      return <> <div className="row p-3 bg-success text-light">
        <h1> MERN TODO PROJECT</h1>

      </div>
      <div className="row">
        <h3>
            Add Item</h3>
            {message &&<p className="text-success">{message}</p>}
            
           
            <div className="form-group d-flex gap-2">
<input placeholder="ENTER THE DATE" onChange={(e)=>setTitle(e.target.value)} value={title}className="form-control" type="text"/>
<input placeholder="ENTER THE DESCRYPTION"value={descryption}onChange={(e)=>setDescryption(e.target.value)} className="form-control" type="text"/>
<button className="btn-dark" onClick={handleSubmit}>SUBMIT</button>
            </div>
            {error &&<p className="text-danger">error</p>}
            
             </div>
             <div className="row mt-3">
                <h3 >Tasks</h3>
                

 <ul className="list-group">
               
               
                    {
                        todos.map((item)=><li className="list-group-item  bg-info d-flex justify-content-between align-items-center my-2">
                        <div className="d-flex flex-column me-2">{
                            editid==-1 ||editid!==item._id?<>
                            <span className="fw-bold">{item.title}</span>
                          <span >{item.descryption}</span>
                            </>:<>
                            <div>
                                <input placeholder="ENTER THE DATE" onChange={(e)=>seteditid(e.target.value)} value={edittitle}className="form-control" type="text"/>
<input placeholder="ENTER THE DESCRYPTION"value={editdescryption}onChange={(e)=>seteditDescryption(e.target.value)} className="form-control" type="text"/>

                            </div>
                            </>}</div>
                        
                        
                        <div className="d-flex gap-2">{ editid==-1 ||editid!==item._id?<button className="btn btn-warning" onClick={()=>handleedit(item)}>Edit</button>:<button onClick={handleUpdate}>Update</button>}
                       { editid==-1 ? <button className="btn btn-danger"onClick={()=>handledelete(item._id)}>Delete</button>:
                       <button className="btn btn-danger" onClick={handleeditcancel}>Cancel</button>}
                        </div>
                    </li>
                    )
                    }
                    

                </ul>

             </div>
            </>
            }