package cn.edu.sdu.ise.labs.controller;

import cn.edu.sdu.ise.labs.dto.AccountingDTO;
import cn.edu.sdu.ise.labs.dto.query.AccountingQueryDTO;
import cn.edu.sdu.ise.labs.dto.query.MonthQueryDTO;
import cn.edu.sdu.ise.labs.dto.query.TimeQueryDTO;
import cn.edu.sdu.ise.labs.dto.query.WordCloudQueryDTO;
import cn.edu.sdu.ise.labs.model.Inquiry;
import cn.edu.sdu.ise.labs.model.Page;
import cn.edu.sdu.ise.labs.model.Select;
import cn.edu.sdu.ise.labs.service.AccountingService;
import cn.edu.sdu.ise.labs.vo.AccountingVO;
import cn.edu.sdu.ise.labs.vo.TimeSelectVO;
import cn.edu.sdu.ise.labs.vo.WordCloudVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
/**
 * @author G.L. W
 */
@RestController
@RequestMapping("accounting")
public class AccountingController {
    @Autowired
    private AccountingService accountingService;

    @PostMapping("add")
    public Integer add(@RequestBody AccountingDTO accountingDTO) {
        return accountingService.addAccounting(accountingDTO);
    }

    @PostMapping("update")
    public Integer update(@RequestBody AccountingDTO accountingDTO) {
        return accountingService.updateAccounting(accountingDTO);
    }

    @PostMapping("list")
    public Inquiry<AccountingVO> list(@RequestBody AccountingQueryDTO queryDTO) {
        return accountingService.listByPage(queryDTO);
    }

    @PostMapping("delete")
    public Boolean delete(@RequestBody List<Integer> ids) {
        accountingService.deleteByCodes(ids);
        return true;
    }

    @PostMapping("getByCode")
    public String getByCode() {
        return "Hello,world";
    }

    @PostMapping("timeSelect")
    public Select<TimeSelectVO> timeSelect(@RequestBody TimeQueryDTO timeQueryDTO){
        return accountingService.timeSelect(timeQueryDTO);
    }

    @PostMapping("monthList")
    public Page<AccountingVO> listMonth(@RequestBody MonthQueryDTO queryDTO) {
        return accountingService.listMonthByPage(queryDTO);
    }


    @PostMapping("wordCloud")
    public Select<WordCloudVO> wordCloud(@RequestBody WordCloudQueryDTO queryDTO){
        return accountingService.listWordCloud(queryDTO);
    }
}

