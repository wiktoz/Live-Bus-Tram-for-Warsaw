import {BiBus} from 'react-icons/bi'
import {MdOutlineTram} from 'react-icons/md'

const Icon = ({type}) => {
    return(
        <div className={'bg-white border-2 rounded-full w-8 h-8 flex justify-items-center items-center text-center ' + (type == 'bus' ? 'border-[#893e82]' : 'border-[#eb0303]')}>
            {
                type == 'bus' ?
                <BiBus className='text-lg w-full'/> :
                <MdOutlineTram className='text-lg w-full'/>
            }
        </div>
    )
}

export default Icon