/*******************************************************************************
 * Copyright (C) 2017 Create-Net / FBK.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License 2.0
 * which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 * 
 * Contributors:
 *     Create-Net / FBK - initial API and implementation
 ******************************************************************************/
package org.eclipse.agail.object;

import org.freedesktop.dbus.Position;
import org.freedesktop.dbus.Struct;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"parameters"})
public class ProtocolOverview  extends Struct{
	@Position(0)
	public final String name;
	@Position(1)
	public final String id;
	@Position(2)
	public final String dbusInterface;
	@Position(3)
	public final String status;
	
	/**
	 * 
	 * @param name
	 * 				Protocol Name e.x: Bluetooth LE
	 * @param id
	 * 				The internal code identifying the protocol e.x (BLE)
	 * @param dbusInterface
	 * 				The DBus interface reference
	 * @param status
	 * 				Status of the protocol
	 */
	public ProtocolOverview(String name, String id, String dbusInterface, String status) {
		this.name = name;
		this.id = id;
		this.dbusInterface = dbusInterface;
		this.status = status;
	}


	public String getName() {
		return name;
	}


	public String getId() {
		return id;
	}


	public String getDbusInterface() {
		return dbusInterface;
	}


	public String getStatus() {
		return status;
	}
 
}
