import { DetailedHTMLProps, InputHTMLAttributes, useRef } from "react";
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = (props:DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {

    const clickPoint = useRef<HTMLDivElement | null>(null);
    const handleFocus = () => {
        if (clickPoint.current) {
            clickPoint.current.style.display = "none";
        }
    };

    const handleBlur = () => {
        if (clickPoint.current) {
            clickPoint.current.style.display = "block";
        }
    };

    return (
        <div className="items-start px-2 " >
            <div className="item-center relative mr-3 ">
                <div className="absolute  top-2 left-2 items-center" ref={clickPoint}>
                < SearchIcon className=" w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20" clipRule="evenodd" fillRule= "evenodd"/>

                    
                    
                </div>
                <input
                    type="text"
                    className="block p-2.5 pl-10 w-96 text-secondary bg-slate-50 rounded-lg border border-gray-300 focus:pl-3 focus:ring-primary focus:outline-primary  hover:border-primary"
                    placeholder="Find food..."
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...props}
                    
                />
            </div>
        </div>
    );
}

export default SearchBar