# AGILE API specification documents

Welcome to the AGILE API specifications!

***This document is a work in progess that will be properly reviewed and finalized soon***

In this repository we are going to define and version the internal API exposed by AGILE core modules via DBus IPC.

## Contributing

Create an issue to suggest a modification or propose a change by creating a pull request.

Contributors shall follow those guidelines in order to get their contribution accepted.

##Specification

- The model should be a valid [YAML](http://yaml.org/) document
- All method and property names are CamelCased, more precisely [PascalCased](https://en.wikipedia.org/wiki/CamelCase)
- All top level definitions *may* have a `group` text or text list to aggregate different object in categories. A `tags` list is used to aggregate different object on various topics.
- Methods *must* indicate a `return` type, with `void` if no return is expected and optionally a list of `arguments`
- Methods `arguments` *must* be a map with name as key and at least the `type` field specified as value
- Methods `arguments` and `properties` *may* have a `default` value to indicate a predefined value if non is specified.
- Asynchronous Methods *must* indicate a `reference` field indicating one or more Properties that receive updates from the call
- Properties referencing *one* object must have a `reference` field. If it is a list there will be a type `Array` with the `reference` field.
- Properties can indicate an `access` field as list of one of  `r`ead, `w`rite, `s`ubscribe
- Optionally a `description` can be provided on methods, arguments and properties
- Optionally an `example` can be provided on methods, arguments and properties in a JSON like format, eg. `example: { key1: value1, key2: value42 }`

###Object description example

```yaml

iot.agile.ObjectName:

  MethodName:
    description: <method description>
    arguments:
      arg1:
        description: <param description>
        type: <type>
    return: <return type>

  SimpleProperty:
    description: <method description>
    type: <type>
    access: [r, w, s]

  ReferenceProperties:
    description: <method description>
    reference: [iot.agile.AnotherObject]

```

#### Types:

`@NOTE: Subtypes should be added accordingly and mapped to DBus supported types`

- In case an `Object` or `Array` is specified a `values` field should be added to describe the content.
- Use an `*` to indicate a complex variable (like Object and Array) has non specified return type, eg. `Object*`
- Enum should be defined in the same document of the object using it, eventually with an unique name inside the whole specs
- Enum should be defined as autonomous types with a field `enum` and a list of `values` with keys


***Primitive types:***

- Number: eg. `1`, `5.9`, `-0.1`
- String: eg. `"Anything in double quotes :)"`
- Boolean: eg. `true` or `false`

***Structured types:***

- **Enum**: a list of predefined keys

```
StatusType
  enum:
    - CONNECTED
    - DISCONNECTED
```

- **Object**: a group of structured informations

```yaml
ObjName:
  type: Object
  fields:
    name: String
    id: Number
    address: String
```

- **Array**: an ordered list containing one or more types

```yaml
ArrayField:
  type: Array
  fields:  String
```

#### Example definition

```yaml

iot.agile.Device:
  Name:
    description: The device name
    type: String
   Status :
    description: Indicate the current device status
    type: StatusType
  Profile:
    description: Contains user provided information on device in order to handle at Protocol level the specific implementation
    type: Object*
  Protocol:
    description: Protocol instance
    reference: iot.agile.Protocol
  Read:
    args:
      sensorName: String
    return: Object

```

## References

- [DBus API design](https://dbus.freedesktop.org/doc/dbus-api-design.html)
- [JSON schema](http://spacetelescope.github.io/understanding-json-schema/)
- [AGILE website](http://agile-iot.eu/)
- [Get in touch](https://twitter.com/agile_iot)
