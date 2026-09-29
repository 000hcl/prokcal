const Selector = ({ itemList, newAddition, setNewAddition, label, selectLabel }) => {
  return (
    <div>
      <label>
        {label}
        <select
          value={newAddition?.id ?? ''}
          onChange={e => {
            const item = itemList.find(i => String(i.id) === e.target.value)
            setNewAddition(item ?? null)
          }}
        >
          <option value=''>{selectLabel}</option>
          {
            itemList.map(i => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))
          }
        </select>
      </label>
    </div>
  )
}

export default Selector