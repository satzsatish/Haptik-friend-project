import "./index.css";
import "./App.css";
import { useState ,useCallback} from "react";
import FriendCard from "./Components/FriendCard/FriendCard";
import AddFriend from "./Components/AddFriend/AddFriend";
import FriendHeading from "./Components/FriendHeading/FriendHeading";
import Modal from "./Components/Modal/Modal";
import Pagination from "./Components/Pagination/Pagination";
export default function App() {

  const [ShowModal, SetModal] = useState();
  const [search, SetSearch] = useState("");
  const [friend, SetFriend] = useState([]);
  const [showpage,SetShowPage] = useState('');
  const [copyfriend, SetCopyFriend] = useState([]);
  const [sortFav, SetSortFav] = useState('N');
  const [currentPage, SetCurrentPage] = useState(1);
  const [listPerPage, SetlistPerPage] = useState(4);

/* add friend to list  */
  const addNameHandler = (value) => {
    if(value!=""){
      let nameExist='N';
      friend.filter((list,index) => {
        if (list.name.toLowerCase().includes(value.toLowerCase())) {
          nameExist='Y';
        }
      })
      if(nameExist != 'Y'){
        if(friend.length > 4 && showpage == ''){
          SetShowPage('Y')
        }else{
          SetShowPage('');
        }
        let newEntry = {
          id:Math.floor(Math.random() * 100) + 1,
          name: value,
          favorites: "N"
        };
        console.log(newEntry);
        SetFriend([...friend, newEntry]);
      }else{
        SetModal({
         'title':'Add List',
         'msg':'Name Exist',
         'Show':'Y',
         'ShowDelete':''
        })
      }
    }else{
      SetModal({
       'title':'Add List',
       'msg':'Please Enter Name',
       'Show':'Y',
       'ShowDelete':''
      })
    }
  };
  /* search friend from list*/
  const searchNameHandler = (e) => {
    const keyCode = e.keyCode || e.which;
    if (keyCode === 13 && search !='') {
      SetCopyFriend(friend);
      const totalPagecount=friend.length/4;
      const getIndex=friend.filter((list,index) => {
        if (search === '') {
          return list;
        } else if (list.hasOwnProperty('name') && list.name.toLowerCase().includes(search.toLowerCase())) {
          return list;
        }
      })
      SetFriend(getIndex);
      SetCurrentPage(1);
      SetSearch("")
    }else{
      SetModal({
       'title':'Search Name',
       'msg':'Please Enter Name To Search',
       'Show':'Y',
       'ShowDelete':''
      })
    }
  }
  /*set searched value to state */
  const searchFriendHandler =(e)=>{
    if(e.target.value!=""){
      SetSearch(e.target.value);
    }else{
      console.log("else");
      console.log(copyfriend);
      SetFriend(copyfriend);
    }
  }
  /* confirm delete name from list */
  const removeHandler = (index,name) => {
    SetModal({
      title:'Are Sure Want to Delete?',
      msg:`${name} from your list` ,
      ShowDelete:'Y',
      id:index,
      Show:'Y'
    });
  };
  /*delete name from list after confirm*/
const deleteNameHandler  = () => {
  const removedFriend=friend.filter((friend) =>{
          return friend.id !== ShowModal.id;
  });
  SetFriend(removedFriend);
  SetModal({
    title:'Delete From List',
    msg:`Name removed from your list` ,
    ShowDelete:'',
    Show:'Y'
  });
}
  /* to set favorite in list */
  const addFavoriteHandler = (id,index) => {
     SetFriend([...friend],friend.filter((friend) => {
       if(friend.id === id && friend.favorites == 'Y') {
         friend.favorites='N'
       }else if(friend.id === id){
         friend.favorites='Y'
       }
     }))
     console.log(friend);
  };
  /*sort list to asc or desc */
  const sortFriendHandler = (e) => {
    console.log(e.target.value);
    let sortFriend;
    if(e.target.value == 'desc' && friend.length > 0){
      SetSortFav('desc');
      sortFriend=friend.sort((a, b) => (a.favorites < b.favorites ? 1 : -1));
    }else if(e.target.value == 'asc' && friend.length > 0){
      SetSortFav('asc');
      sortFriend=friend.sort((a, b) => (a.favorites > b.favorites ? 1 : -1));
    }else if(friend.length == 0){
      sortFriend=friend;
      SetSortFav('N');
      SetModal({
       'title':'Add List',
       'msg':'Please Add Name To List',
       'Show':'Y',
       'ShowDelete':''
      })
    }else{
      SetSortFav('N');
      sortFriend=friend;
    }
    SetFriend(sortFriend);
  }
  /* for pagination */
  const lastIndexOfPage=currentPage*listPerPage;
  const firstIndexOfPage=lastIndexOfPage-listPerPage;
  const currentList=friend.slice(firstIndexOfPage,lastIndexOfPage);
  const paginate = (num) => SetCurrentPage(num);

  let friendlist;
  friendlist = currentList.filter(list => {
    if (search === '') {
      return list;
    } else if (list.hasOwnProperty('name') && list.name.toLowerCase().includes(search.toLowerCase())) {
      return list;
    }
  }).map((list,index) => {
    return (
      <FriendCard
        key={list.id}
        name={list.name}
        favorite={() => addFavoriteHandler(list.id,index)}
        showfav={list.favorites}
        removeHandler={() => removeHandler(list.id,list.name)}
      />
    );
  });
  return (
    <div className="App">
     <FriendHeading />
      <div className="nav">
        <AddFriend addNameHandler={addNameHandler} />
        <input type="search" name="search" autoComplete="off" placeholder="Search your friend's name"
        onKeyUp={searchNameHandler}
        onChange={searchFriendHandler} style={{width:'33%'}}/>
        <select value={sortFav} onChange={sortFriendHandler} style={{width:'34%'}}>
        <option value="N">Sort by </option>
        <option value="desc">Favorite</option>
        <option value="asc">unfavourite</option>
        </select>
      </div>
      {friend && friendlist}
      {showpage && <Pagination listPerPage={listPerPage} totalPage={friend.length} paginate={paginate}/>}
      {ShowModal && <Modal  title={ShowModal.title} ShowDelete={ShowModal.ShowDelete} deleteNameHandler={deleteNameHandler} msg={ShowModal.msg} closeModal={SetModal}/>}
    </div>
  );
}
