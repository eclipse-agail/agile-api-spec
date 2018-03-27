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

import java.util.List;

import org.freedesktop.dbus.Position;
import org.freedesktop.dbus.Struct;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties({"parameters"})
public class DeviceDefinition extends Struct {
	@Position(0)
	@JsonProperty("deviceId")
	public final String deviceId;
	@Position(1)
	@JsonProperty("address")
	public final String address;
	@Position(2)
	@JsonProperty("name")
	public final String name;
	@Position(3)
	@JsonProperty("description")
	public final String description;
	@Position(4)
	@JsonProperty("protocol")
	public final String protocol;
	@Position(5)
	@JsonProperty("path")
	public final String path;
	@Position(6)
	@JsonProperty("streams")
	public final List<DeviceComponent> streams;

	@JsonCreator
	public DeviceDefinition(@JsonProperty("deviceId") String deviceId, @JsonProperty("address") String address,
			@JsonProperty("name") String name, @JsonProperty("description") String description,
			@JsonProperty("protocol") String protocol, @JsonProperty("path") String path,
			@JsonProperty("streams") List<DeviceComponent> streams) {
		this.deviceId = deviceId;
		this.address = address;
		this.name = name;
		this.description = description;
		this.protocol = protocol;
		this.path = path;
		this.streams = streams;
	}

	public String getDeviceId() {
		return deviceId;
	}

	public String getAddress() {
		return address;
	}

	public String getName() {
		return name;
	}

	public String getDescription() {
		return description;
	}

	public String getProtocol() {
		return protocol;
	}

	public String getPath() {
		return path;
	}

	public List<DeviceComponent> getStreams() {
		return streams;
	}

}
