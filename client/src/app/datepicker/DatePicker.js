import React, { useState , useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Import the styles
import 'react-date-range/dist/theme/default.css'; // Import the styles
import { addDays } from 'date-fns';
import { UpdateDateandTime } from '@/redux/slice/getDateSlice';
import { useDispatch, useSelector } from 'react-redux';

function DateRangePickerComponent() {


    const dispatch = useDispatch();

    const DateFinder = useSelector((state) => state.dateFinder);
  
    const { startdateFinder , enddateFinder} = DateFinder

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(addDays(new Date(), 0));

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
    
    const handleDateChange = (item) => {
        setStartDate(item.selection.startDate);
        setEndDate(item.selection.endDate);
        dispatch(UpdateDateandTime({ startdateFinder: formatDate(startDate) , enddateFinder: formatDate(endDate) }));
    };



    
      useEffect(() => {
        dispatch(UpdateDateandTime({ startdateFinder: formatDate(startDate) , enddateFinder: formatDate(endDate) }));
    
    }, [startdateFinder , enddateFinder ])
    return (
        <div>
            <DateRangePicker
                onChange={handleDateChange}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={[
                    {
                        startDate,
                        endDate,
                        key: 'selection',
                    }
                ]}
                direction="horizontal"
            />
        </div>
    );
}

export default DateRangePickerComponent;
