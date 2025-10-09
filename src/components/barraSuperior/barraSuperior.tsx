import { BtnAbrirMenuLateral } from '@components/MenuLateral/botoesMenu'
import Tooltip from '@components/tooltip/tooltipwrapper'
import DarkmodeButton from './darkmodeButton'
import AvatarOptions from './avatarOptions'
import Timer from './timer'



function BarraSuperior() {

  return (
    <nav className="w-full p-4 flex  justify-between items-center b-1 border-b-1 border-[var(--base-variant)] ">
      
          <div>
          <BtnAbrirMenuLateral />
          </div>


        <div className="flex items-center gap-4 justify-center ">
          <Timer />
          <Tooltip tooltip="Alterne entre tema claro e escuro" position="left">
            <DarkmodeButton />
          </Tooltip>

          <AvatarOptions />

          
      

        </div>

        
    </nav>
  )
}

export default BarraSuperior