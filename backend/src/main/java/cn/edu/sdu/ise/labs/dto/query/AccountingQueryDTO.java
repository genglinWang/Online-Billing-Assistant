package cn.edu.sdu.ise.labs.dto.query;

import lombok.Data;

/**
 * @author wgl
 * @description
 * @date 2019/12/3 10:18
 */
@Data
public class AccountingQueryDTO extends PageQueryDTO{
    private String accountingName;

    private String year;

    private String month;

    private String day;

    private Integer beginYear;

    private Integer endYear;

    private Integer beginMonth;

    private Integer endMonth;

    private Integer beginDay;

    private Integer endDay;
}
