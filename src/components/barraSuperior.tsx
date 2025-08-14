import Tooltip from './tooltip/tooltipwrapper'
import DarkmodeButton from './darkmode/darkmodeButton'
import { BtnAbrirMenuLateral } from './MenuLateral/botoesMenu'

function BarraSuperior() {

  return (
    <nav className="w-full p-4 flex justify-between items-center">
      
          <div>
          <BtnAbrirMenuLateral />
          </div>


        <div className=''>
          <Tooltip tooltip="Alterne entre tema claro e escuro" position="left">
            <DarkmodeButton />
          </Tooltip>
      

        </div>

        
    </nav>
  )
}

export default BarraSuperior