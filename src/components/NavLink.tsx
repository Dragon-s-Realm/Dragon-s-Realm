// Importa o NavLink original do react-router-dom, mas renomeia para RouterNavLink
// Também importa os tipos das props do NavLink (NavLinkProps)
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";

// Importa o forwardRef do React para permitir repassar refs
import { forwardRef } from "react";

// Importa o utilitário 'cn' (className merge), geralmente usado para juntar classes dinamicamente
import { cn } from "@/lib/utils";

// Interface que estende as props do NavLink, mas remove 'className' da tipagem original
// Adiciona: className, activeClassName e pendingClassName
interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;        // Classes padrão
  activeClassName?: string;  // Classes aplicadas quando o link está ativo
  pendingClassName?: string; // Classes aplicadas quando o link está em estado pendente (navegação)
}

// Cria o componente NavLink usando forwardRef, permitindo receber e repassar uma ref
const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref} // repassa a ref
        to={to}   // caminho do link
        className={({ isActive, isPending }) =>
          // Combina classes:
          //  - className padrão
          //  - activeClassName se o link estiver ativo
          //  - pendingClassName se estiver pendente
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props} // repassa o restante das props
      />
    );
  },
);

// Define o nome exibido no React DevTools
NavLink.displayName = "NavLink";

// Exporta o componente
export { NavLink };
