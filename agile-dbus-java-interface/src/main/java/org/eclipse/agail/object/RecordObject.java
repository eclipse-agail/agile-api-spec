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
public final class RecordObject extends Struct {
	@Position(0)
	public final String deviceID;
	@Position(1)
	public final String componentID;
	@Position(2)
	public final String value;
	@Position(3)
	public final String unit;
	@Position(4)
	public final String format;
	@Position(5)
	public final long lastUpdate;

	public RecordObject(String deviceID, String componentID, String value, String unit, String format,
			long lastUpdate) {
		this.deviceID = deviceID;
		this.componentID = componentID;
		this.value = value;
		this.unit = unit;
		this.format = format;
		this.lastUpdate = lastUpdate;
	}

	public String getDeviceID() {
		return deviceID;
	}
 
	public String getComponentID() {
		return componentID;
	}
 
	public String getValue() {
		return value;
	}

	public String getUnit() {
		return unit;
	}
 	public String getFormat() {
		return format;
	}

 	public long getLastUpdate() {
		return lastUpdate;
	}

}
