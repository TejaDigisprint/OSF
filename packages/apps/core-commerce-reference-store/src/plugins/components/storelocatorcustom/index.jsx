import React, {useContext,useState} from 'react';
import Styled from '@oracle-cx-commerce/react-components/styled';
import Modal from '../modal-custom-store'
import css from './styles.css';
import {StoreContext} from '@oracle-cx-commerce/react-ui/contexts';
import {useSelector} from '@oracle-cx-commerce/react-components/provider';
const storelocatorcustom = props => {
  const store = React.useContext(StoreContext)
  const [StoreOpen,setStoreopen]=useState(false)
  const [StoreSelect,setStoreSelect]=useState("")
  const [StoreSelectRadio,setStoreSelectRadio]=useState(false)
  const storesLIst = {'201':'New Jersey','202':'WashingTon DC','203':'New Haven Country'}
  let [storeValue,setStoreValue] = useState("")
  let [err,setErr] = useState(false)
  let showStore = useSelector(state=>state.store)
  
  React.useMemo(()=>{
    setStoreSelect("");
    setStoreSelectRadio(false)
    setStoreValue("")
    setErr(false)

  },[StoreOpen])
  const ValidateStore =()=>{
    if(StoreSelect.length==3){
      let locationString = getStoreById();
      if(locationString && locationString.length>0){
        setErr(false)
        setStoreSelectRadio(true)
        setStoreValue(locationString)
      }
      else{
        setErr(true)
      }
    }
    else{
      setErr(true)
    }
  }
  const getStoreById = () =>{
    let value = false;
    let newArr = Object.keys(storesLIst).map((item,index)=>{
      if(item == StoreSelect){
        value = index
        return storesLIst[item]
      }
    })
    if(value !== false){
      return newArr[value]
    }
  }
  return (
    <Styled id="storelocatorcustom" css={css}>
      <div className="storelocatorcustom">
        <div className="storelocatorcustom__Container">
          <i  onClick={() => setStoreopen(!StoreOpen)} className="fas fa-map-marker-alt storelocatorcustom__Icon"></i>
        </div>
        <p className="storelocatorcustom__text">{showStore && showStore.location && showStore.location.length>0 && showStore.location || 'Locate a store'}</p>
        
        <Modal
          title="Store Locator"
          show={StoreOpen}
          onClose={() => setStoreopen(!StoreOpen)}
        >
          <input type="text" onChange={(e)=>setStoreSelect(e.target.value)}/> &nbsp;&nbsp;
          <button type="submit" onClick={ValidateStore}>Select</button><br/>
             {StoreSelectRadio?<><input type="radio" onClick={() => {store.action("store",storeValue);setStoreopen(!StoreOpen)}} value={storeValue}/><span>{storeValue}</span></>:null} 
             {err && <p style={{color:'red'}}>Invalid Locator Code</p>}
        </Modal>
      </div>
    </Styled>
  );
};
export default storelocatorcustom;