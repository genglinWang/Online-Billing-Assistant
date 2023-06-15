package cn.edu.sdu.ise.labs.service.utils;

import cn.edu.sdu.ise.labs.dto.AccountingDTO;
import cn.edu.sdu.ise.labs.model.Accounting;
import cn.edu.sdu.ise.labs.utils.FormatUtils;
import cn.edu.sdu.ise.labs.vo.AccountingVO;
import org.springframework.beans.BeanUtils;
import org.springframework.util.Assert;

public class AccountingUtils {
    public static void validateAccounting(AccountingDTO accountingDTO) {
        FormatUtils.trimFieldToNull(accountingDTO);
        Assert.notNull(accountingDTO, "部门输入数据不能为空");
        Assert.hasText(accountingDTO.getAccountingName(), "部门名称不能为空");
    }

    /**
     * 将实体对象转换为VO对象
     *
     * @param accounting 实体对象
     * @return VO对象
     */
    public static AccountingVO convertToVO(Accounting accounting) {
        AccountingVO accountingVO = new AccountingVO();
        BeanUtils.copyProperties(accounting, accountingVO);
        accountingVO.setCreatedAt(FormatUtils.formatFullDate(accounting.getCreatedAt()));
        accountingVO.setUpdatedAt(FormatUtils.formatFullDate(accounting.getUpdatedAt()));
        return accountingVO;
    }
}
