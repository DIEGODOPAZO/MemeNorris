"use client"
import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export default function DropDM({data}) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["All"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

console.log(data)
  return (
    <Dropdown>
      <div className="flex flex-row justify-center text-white">
      <h3 className="text-3xl mr-5 p-3"> Categories: </h3>
      <DropdownTrigger>
        <Button 
        variant="bordered" 
          className="bg-teal-600 hover:bg-teal-700 text-3xl p-3 rounded my-4 capitalize"
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      </div>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        className="bg-teal-200 rounded-lg p-3 text-slate-800"
      >
  <DropdownItem key="All" className="custom-drop-item">All</DropdownItem>
  {data.map((category) => (
          <DropdownItem key={category} className="custom-drop-item">{category}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
