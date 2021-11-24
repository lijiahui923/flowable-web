let currentFalg = {
    bol: true,
    id: ''
  }
  let currnetId = ''
  export function setIsAdd(bol, id) {
    currentFalg = {
      bol,
      id
    }
  }
  
  export function getIsAdd() {
    return currentFalg
  }
  
  export function setId(id) {
      currnetId = id
    }
    
    export function getId() {
      return currnetId
    }
  