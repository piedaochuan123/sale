const shoppingCart={
    state:{
      commodity:[]
    },
    mutations:{
       add(state,commodity){
           
           if(state.commodity.find(x=>{
               return x==commodity
           }) == undefined)
           state.commodity.push(commodity)
       },
       delete(state,commodity){
          for(let i=0;i<state.commodity.length;i++){
              if(stete.commodity[i] == commodity){
                  state.commodity.splice(i,1)
                  break;
              }
          }
       },
       empty(state){
           state.commodity=[]
       }
    },
}


export default shoppingCart;