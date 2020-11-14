// import DatePicker from 'react-detepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// const useState = React.useState

// function Date() {

//     const [selectedDate, setSelectDate] = useState(null)
//     return (
//         <div className="Cal">
//             <DatePicker selected={selectedDate} onChange={date => setSelectDate(date)}
//              id = 'Due Date'
//              placeholderText='yyyy/MM/dd'
//              dateFormat = 'yyyy/MM/dd'
//              minDate={new Date()}
//              isClearable
//              showYearDropdown
//              scrollableMonthYeardropdown

//             />

//         </div>
//     );
// }

const { useEffect, useRef, useState, useCallback } = React;

      const Calendar = () => {
        const wrapperRef = useRef();
        const [state, setState]=useState({ date: null, isOpen: false });

        const handleDateChange = useCallback(date => setState(prevState => ({ ...prevState, date })),[setState]);

        const openCalendar = useCallback(() => setState(prevState => ({ ...prevState, isOpen: !prevState.isOpen })), [setState]);

        const handleClickOutside = useCallback(({ target }) => {
          if (state.isOpen && wrapperRef && !wrapperRef.current.contains(target)) {
            setState(prevState => ({ ...prevState, isOpen: false }));
          }
        },
        [state.isOpen, wrapperRef]);

        useEffect(
          () => {
            document.addEventListener("mousedown", handleClickOutside);

            return () => {
              document.removeEventListener("mousedown", handleClickOutside);
            };
          },
          [handleClickOutside]
        );

        return (
         <div className="container">
           <div className="calendar-container" ref={wrapperRef}>
            <button className="uk-button uk-button-primary date-button" onClick={openCalendar}>{!state.isOpen ? "Select Date" : "Close"}</button>
            { state.isOpen && <Datetime input={false} onChange={handleDateChange}></Datetime>}
           </div>
           { state.date && <p>Selected Date: {moment(state.date).format("MM/DD/YYYY hh:mm a")}</p> }
         </div>
        );
      }

    //   function Cal() {
    //     return (
    //       <div className="calendar">
    //         <Calendar />
    //       </div>
    //     );
    //   }
      
    //   // export default App;
      
    //   ReactDOM.render(<Cal />, document.getElementById('calendar'));