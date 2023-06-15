package cn.edu.sdu.ise.labs.model;

import lombok.Data;

import java.util.Date;

/**
 * @author G.L. W
 */
@Data
public class Accounting {
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
    private Date createdAt;

    /**
     * 修改日期
     */
    private Date updatedAt;

    /**
     * 创建人代码
     */
    private String createdBy;

    /**
     * 更信人代码
     */
    private String updatedBy;

    /**
     * 删除标记
     */
    private Boolean deleted;
}
