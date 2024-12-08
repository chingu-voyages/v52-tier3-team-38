import React, { useState, useRef, useEffect } from 'react'
import { Form } from 'react-bootstrap'

const AddressFormSection = ({address, setAddress}) => {
  const [addressSuggestions, setAddressSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const timeoutRef = useRef();
  const addressFormRef = useRef();

  const onAddressChange = (userInput) => {
    if (timeoutRef.current) { // if there is a previous timeout in place, get rid of it. Prevents uneccessary api calls.
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => { // Any time a user enters something, after 0.3 seconds we call the api to process the input
      getSuggestions(userInput);
    }, 300)
  }

  const getSuggestions = async (input) => {
    if (!input) {
        setAddressSuggestions([])
        return;
    }

    const response = await fetch('/api/addressSuggestions', {
      method: "POST",
      body: JSON.stringify({query: input})
    })

    const suggestedAddresses = await response.json()

    if (suggestedAddresses.length) {
      setAddressSuggestions(suggestedAddresses)
      setShowSuggestions(true)
    }
  }

  const handleOutsideClick = (event) => { // if a user clicks outside of the address section, and the suggestions are visible, hide it.
    if (addressFormRef.current && !addressFormRef.current.contains(event.target)) {
      setShowSuggestions(false)
    }
  }

  useEffect( () => { //any time a click occurs check if the click was inside the address section
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown",handleOutsideClick)
    }
  }, [])

  return (
    <Form.Group className="mb-2" controlId="Address" ref={addressFormRef}>
      <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          value={address}
          placeholder="Address"
          onChange={(e) => {
            setAddress(e.target.value);
            onAddressChange(e.target.value);
          }}
          required
        />
        { showSuggestions ? (
          <div className="position-relative">
            <ul className="list-group position-absolute w-100" style={{zIndex: 1000}}>
              {addressSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => {
                    setAddress(suggestion)
                    setShowSuggestions(false)
                  }}
                  style={{cursor:"pointer"}}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        ) : ""}
    </Form.Group>
  )
}

export default AddressFormSection;