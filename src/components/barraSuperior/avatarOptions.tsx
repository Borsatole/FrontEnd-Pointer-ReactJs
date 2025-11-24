import { AuthContext } from "@src/context/AuthContext";
import { Avatar, createTheme, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, ThemeProvider } from "flowbite-react";
import { useContext } from "react";
import { Confirm } from "@components/comum/alertas";
import AvatarButton from "./avatarButton";


function AvatarOptions() {
 const { logout, auth } = useContext(AuthContext);
 

  return (
      <div className='max-w-10 h-10'>
        <Dropdown
          label={<AvatarButton />}
          arrowIcon={false}
          inline
        >
          <DropdownHeader>
            <span className="block text-sm">{auth.user?.nome}</span>
            <span className="block truncate text-sm font-medium">{auth.user?.email}</span>

            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                    bg-[var(--corPrincipal)] text-[var(--text-white)] shadow-sm">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
              </svg>
              <span>{auth.user?.nivel_nome}</span>
            </div>
          </DropdownHeader>
          {/* <DropdownItem>Dashboard</DropdownItem> */}
          {/* <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem> */}
          {/* <DropdownDivider /> */}
          <DropdownItem onClick={() => 
            Confirm({
                onConfirm: logout, 
                onCancel: () => {},
                text: "Deseja realmente sair?"
            })}>Sign out</DropdownItem>
        </Dropdown>
      </div>
  )
}

export default AvatarOptions