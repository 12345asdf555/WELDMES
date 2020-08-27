package com.spring.enums;

public enum WeldEnum {
	//1.用户状态
	NoLine(11,"在线"),
	OffLine(12,"离线"),
	//2.组织机构类型
	Project0(20,"集团"),
	Project1(21,"公司"),
	Project2(22,"事业部"),
	Project3(23,"项目部"),
	Project4(24,"施工队"),
	//3.设备状态
	WeldStatus1(31,"启用"),
	WeldStatus2(32,"封存"),
	WeldStatus3(33,"维修"),
	WeldStatus4(34,"报废"),
	//4.设备类型
	WeldType1(41,"氩弧焊"),
	WeldType2(42,"手工焊"),
	WeldType3(43,"气保焊"),
	WeldType4(44,"埋弧焊"),
	//5.焊机维护类型
	MaintainType1(51,"日常维修"),
	MaintainType2(52,"二级保养"),
	MaintainType3(53,"大修"),
	//6.是否在网
	NetworkingYes(0,"是"),
	NetworkingNo(1,"否");
	
	private int key;
	private String value;
	public int getKey() {
		return key;
	}
	public void setKey(int key) {
		this.key = key;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	
	private WeldEnum(int key, String value) {
		this.key = key;
		this.value = value;
	}
	
	/**
	 * 获取枚举值
	 * @param index
	 * @return
	 */
    public static String getValue(int index) {
        for (WeldEnum e : WeldEnum.values()) {
            if (e.getKey() == index) {
                return e.value;
            }
        }
        return null;
    }
    
    /**
     * 获取枚举键
     * @param value
     * @return
     */
    public static int getKey(String value) {
        for (WeldEnum e : WeldEnum.values()) {
            if (e.getValue().equals(value)) {
                return e.key;
            }
        }
        return 9999;
    }
	
}
