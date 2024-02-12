import React, { useState } from "react";

export interface OptionsAttribute {
  name: string;
  values: string[];
  selectable: boolean;
}

interface OptionsProps {
  attributes: OptionsAttribute[];
  onValueSelect: (attribute: OptionsAttribute) => void;
  onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void;
  outline ? : boolean;
  disabled ? : boolean;
}

const Options: React.FC<OptionsProps> = ({ attributes, onValueSelect, onClick, disabled, outline }) => {
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);

  const handleValueClick = (attributeIndex: number, valueIndex: number) => {
    const attributeName = attributes && attributes[attributeIndex] && attributes[attributeIndex].name;

    if (attributeName && attributes[attributeIndex].values && attributes[attributeIndex].values[valueIndex]) {
      const selectedAttribute: OptionsAttribute = {
        name: attributeName,
        values: [attributes[attributeIndex].values[valueIndex]],
        selectable: attributes[attributeIndex].selectable,
      };

      setSelectedAttributes((prevSelectedAttributes) => {
        const updatedSelectedAttributes = prevSelectedAttributes.includes(attributeName)
          ? prevSelectedAttributes.filter((attr) => attr !== attributeName)
          : [...prevSelectedAttributes, attributeName];

        onValueSelect(selectedAttribute);

        return updatedSelectedAttributes;
      });
    }
  };

  return (
    <div className="flex items flex-col">
      {attributes.map((attribute, index) => {
        const attributeName = attribute.name;
        const isAttributeSelected = selectedAttributes.includes(attributeName);
        const isPreviousAttributeSelected = selectedAttributes.length > 0;

        return (
          <div key={index} className="mb-8">
            <p className="font-semibold mb-5">{attribute.name}</p>
            <div className="flex">
              {attribute.values.map((value, idx) => (
                <button
                  key={idx}
                  className={`mr-2 cursor-pointer rounded-full px-4 py-1 ${
                    attribute.selectable && attribute.values.includes(value)
                      ? isAttributeSelected
                        ? 'bg-white text-black border-2 border-amber-500'
                        : 'bg-white text-black border-2 border-grey-200'
                      : 'bg-white text-black border-2 border-grey-200'
                  }`}
                  onClick={onClick}
                  disabled={attribute.selectable && attribute.values.includes(value) && (!isAttributeSelected || !isPreviousAttributeSelected)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Options;






