import * as React from "react";

interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  selectedCoupon?: string;
}

export function Select({ selectedCoupon, ...rest } : SelectProps) {
  return (
    <select
      name="tipo"
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      defaultValue={selectedCoupon}
      required
      {...rest}
    >
      <option value="percent">Porcentagem</option>
      <option value="valor">Valor Fixo</option>
    </select>
  );
}


export default Select;
