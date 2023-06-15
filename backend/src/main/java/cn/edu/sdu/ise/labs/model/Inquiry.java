package cn.edu.sdu.ise.labs.model;

import lombok.Data;

import java.util.Collections;
import java.util.List;
@Data
public class Inquiry <T>{

    public Inquiry(int page, int pageSize, int total,List<T> dtolist)
    {
        this.page = page;
        this.pageSize = pageSize;
        this.total = total;
        this.setList(dtolist);
    }
    private List<T>list;

    private int page;

    private int pageSize;

    private int total;


    public static Page getNullPage(Integer page, Integer pageSize) {
        return new Page(page, pageSize, 0, Collections.emptyList());
    }
}
