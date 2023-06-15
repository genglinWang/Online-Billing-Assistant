package cn.edu.sdu.ise.labs.dto;

import lombok.Data;

/**
 * @author G.L. W
 */
@Data
public class AccountingDTO {
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

    private String CreatedAt;
    private String UpdatedAt;

    public void setAccountingName(String accountingName) {
        this.accountingName = accountingName;
    }
}
