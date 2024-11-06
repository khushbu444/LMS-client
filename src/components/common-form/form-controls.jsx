import React from 'react';

function FormControls({ formControls = [], formData, setFormData }) {

  function renderComponentByType(getControlItem) {
    let element = null;
    const currentControlItemValue = formData[getControlItem.name]
    switch (getControlItem.componentType) {
      case "input":
        element = (
          <input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={currentControlItemValue}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={(e) =>
              setFormData({ ...formData, [getControlItem.name]: e.target.value })
            }
          />
        );
        break;

      case "select":
        element = (
          <select
            id={getControlItem.name}
            name={getControlItem.name}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={(value) =>
              setFormData({ ...formData, [getControlItem.name]:value })
            }
            value={currentControlItemValue}
          >
            <option value="" disabled>{getControlItem.label}</option>
            {getControlItem.options && getControlItem.options.length > 0
              ? getControlItem.options.map((optionItem) => (
                  <option key={optionItem.id} value={optionItem.value}>
                    {optionItem.label}
                  </option>
                ))
              : null}
          </select>
        );
        break;

      case "textarea":
        element = (
          <textarea
            id={getControlItem.name}
            name={getControlItem.name}
            value={currentControlItemValue}
            placeholder={getControlItem.placeholder}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={(e) =>
              setFormData({ ...formData, [getControlItem.name]: e.target.value })
            }
          />
        );
        break;

      default:
        element = (
          <input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={currentControlItemValue}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={(e) =>
              setFormData({ ...formData, [getControlItem.name]: e.target.value })
            }
          />
        );
        break;
    }
    return element;
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-white shadow-lg rounded-xl">
      {formControls.map((controlItem) => (
        <div key={controlItem.name} className="flex flex-col">
          <label
            htmlFor={controlItem.name}
            className="mb-2 text-lg font-semibold text-gray-700"
          >
            {controlItem.label}
          </label>
          {renderComponentByType(controlItem)}
        </div>
      ))}
    </div>
  );
}

export default FormControls;
