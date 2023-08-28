import axios, {ResDataType} from "./ajax";

type SearchOption = {
    keyword: string,
    isStar: boolean,
    isDeleted: boolean,
    pageSize: number,  //  每页多少条
    page: number,   //  当前页
}

// 获取单个问卷信息
export async function getQuestionService(id: string): Promise<ResDataType> {
    const url = `/api/question/${id}`;
    return await axios.get(url);
}

// 创建问卷
export async function createQuestionService(): Promise<ResDataType> {
    const url = `/api/question`;
    return await axios.post(url);
}

// 获取（查询）问卷列表
export async function getQuestionListService(opt: Partial<SearchOption> = {}): Promise<ResDataType> {
    const url = `/api/question`;
    return await axios.get(url,{params: opt});

}

// 更新单个问卷
export async function updateQuestionService(id: string,opt: {[key: string]: any}): Promise<ResDataType> {
    const url = `/api/question/${id}`;
    return await axios.patch(url, opt);
}

// 复制问卷
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
    const url = `/api/question/duplicate/${id}`;
    return await axios.post(url);
}

// c批量彻底删除
export async function deleteQuestionsService(id: string[]): Promise<ResDataType> {
    const url = `/api/question`;
    return await axios.delete(url,{data:id});
}
