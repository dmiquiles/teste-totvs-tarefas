import { Task } from "./task.model"

export interface PageableTaskResponse {
    content: Task[]
    pageable: Pageable
    last: boolean
    totalPages: number
    totalElements: number
    first: boolean
    numberOfElements: number
    size: number
    number: number
    sort: Sort
    empty: boolean
}

export interface Pageable {
    pageNumber: number
    pageSize: number
    sort: Sort
    offset: number
    unpaged: boolean
    paged: boolean
}

export interface Sort {
    empty: boolean
    unsorted: boolean
    sorted: boolean
}