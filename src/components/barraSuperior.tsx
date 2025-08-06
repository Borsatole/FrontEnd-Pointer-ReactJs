// import { Tooltip } from 'flowbite-react'
import Tooltip from './tooltip/tooltipwrapper'
import DarkmodeButton from './darkmode/darkmodeButton'
import { BtnAbrirMenuLateral } from './MenuLateral/botoesMenu'

function BarraSuperior() {

  return (
    <nav className=" barra-superior w-full p-4 flex justify-between items-center">
      
      <Tooltip tooltip="Abrir Menu" position="left">
          <BtnAbrirMenuLateral />
        </Tooltip>


        <Tooltip tooltip="Alterne entre tema claro e escuro" position="left">
          <DarkmodeButton />
        </Tooltip>

        
    </nav>
  )
}

export default BarraSuperior