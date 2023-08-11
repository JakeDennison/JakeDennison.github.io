neo-rs Plugin - Repeating Section Manipulator

Version: 1.0

The neo-rs plugin is designed to simplify the process of managing repeating sections within Nintex forms. It allows you to automate the addition of repeating sections.
Properties

The neo-rs plugin provides the following properties:

    rsnumber (number): Specifies the number of repeating sections to add.
        Configure this property to determine how many repeating sections will be created.
        The default value is set to 0, ensure that the default number of sections appled manually is not changed from 1.
    rstarget (string): Specifies the class name of the target repeating sections.
        Use this property to identify the repeating sections to which the plugin will apply its functionality.

Usage

    Adding the Plugin:
        Add the neo-rs plugin to your Nintex form.
        Configure the rsnumber property to set the desired number of repeating sections to add.
        Configure the rstarget property to match the class name of the repeating sections where you want to apply the plugin.
        Locate the repeating section you want to manipulate and apply the same class name. 

License

This plugin is released under the MIT License. For more details, see the LICENSE file.