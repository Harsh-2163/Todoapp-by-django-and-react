import React from 'react'


const List = () => {
    
    const [list,setlist]=React.useState([]);
    const [clicked,setclicked] = React.useState(false);
    const [serchvalue,setserchvalue] = React.useState('');
    const [isediting,setisediting] = React.useState(false);
    const [editid,seteditid] = React.useState(0);
    const [showerror,setshowerror] = React.useState(false);
    const [error,seterror] = React.useState('');

    React.useEffect(()=>{
        getList();
        setTimeout(()=>{
            setshowerror(false);
            seterror('');
        },3000);
    },[,showerror]);


    const handleSave = () =>{
        if(serchvalue === ''){
            setshowerror(true);
            seterror('Invalid Entry');
        }
        else{
            seterror('');
            if(isediting)
            {
                fetch(`/api/list/${editid}`,{
                    method:'PUT',
                'headers':{
                    'Content-Type':'application/json'
                    },
                body:JSON.stringify(serchvalue)
                });
                setisediting(false);
                setserchvalue('');
            }
            else{
                fetch(`/api/list/`,{
                    method:'POST',
                'headers':{
                    'Content-Type':'application/json'
                    },
                body:JSON.stringify(serchvalue)
                    });
                setserchvalue('');
            }
        }
    }

    const handleEdit = ({id,data})=>{
        setisediting(true);
        setserchvalue(data);
        seteditid(id);
    }
    const handleDelete = async(ide) =>{
        fetch(`/api/list/${ide}`,{
          method:'DELETE',
          'headers':{
            'Content-Type':'application/json'
          }
        });
    }

    const getList = async() =>{
        let response = await fetch('/api/list');
        let data = await response.json()
        setlist(data);
    }
    
    return (<>
     <div className='search-bar'>
        <input type='text' placeholder='add item here' onChange={(e)=>setserchvalue(e.target.value)}  value={serchvalue}/>
        <button onClick={handleSave}>{isediting?'Save':'Add'}</button>
    </div>
    {showerror && <h1 className='error'>{error}</h1>}
    <div className='list'>
        {
            list.map((temp,index)=>{
                return (
                    <div className='item' key={index}>
                        <div className={'item-content ' + (clicked ? 'add-strike-through' : null)} onClick={()=>setclicked(true)}>
                            {temp.data}
                        </div>
                        <button className='edit' onClick={()=>handleEdit(temp)}>Edit</button>
                        <button className='delete' onClick={()=>handleDelete(temp.id)}>Delete</button>
                    </div>
                );
            })
        }
    </div>
    </>
  )
}

export default List