# src > lib > SortableList
 ## props
  ### data : 리스트형 데이터를 받는 props
  ### onDropItem : onDropItem Event를 받는 props 
  ### onClickItem : onClickItem Event를 받는 props
  ### renderItem : item render를 받는 props
 
 ## state
  ### [startIndex, setStartIndex] : DragItem의 index를 state로 설정
  ### [listData, setListData] : props로 받은 data를 state로 설정

# src > lib > SortableListItem
 ## props
  ### index : SortableList의 state인 listData의 요소들의 인덱스 
  ### draggable : true | false  
  ### children : SortableList의 renderItem을 props로 받음
  ### onDragStart : SortableList의 onDragStart를 prop로 받아 onDragStartITem에서 사용
  ### onDropItem SortableList의 onDrop을 prop로 받음
  ### onClickItem 
# src > TestItem > TestData
 ### 더미데이터
# src > TestItem > TestItem.jsx 
 ### App.js에서 SortableListItem의 renderItem으로 사용됨

## App.js > SortableList > SortableListItem > TestItem 구조를 가짐 