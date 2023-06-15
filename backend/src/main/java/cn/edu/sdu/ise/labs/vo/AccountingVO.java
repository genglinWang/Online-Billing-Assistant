package cn.edu.sdu.ise.labs.vo;

import lombok.Data;

/**
 * @author G.L. W
 */
@Data
public class AccountingVO {
    /**
     * id
     */
    private Integer id;

    /**
     * 部门名称
     */
    private String accountingName;

    /**
     * 联系人
     */
    private String contact;

    /**
     * 联系电话
     */
    private String contactPhone;

    /**
     * 描述
     */
    private Integer description;

    /**
     * 创建日期
     */
    private String createdAt;

    /**
     * 修改日期
     */
    private String updatedAt;

    /**
     * 创建人
     */
    private String createdBy;

}