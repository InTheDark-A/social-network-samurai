import {actions, follow, unfollow} from './users-reducer'
import {APIResponseType, ResultCodesEnum} from '../api/api'
import {usersApi} from "../api/usersApi";
//
// jest.mock('../api/users-api')
// const userAPIMock = usersApi as jest.Mocked<typeof usersApi>;
//
// const dispatchMock = jest.fn();
// const getStateMock = jest.fn();
//
// beforeEach(() => {
//     dispatchMock.mockClear();
//     getStateMock.mockClear();
//     userAPIMock.follow.mockClear();
//     userAPIMock.unfollow.mockClear();
// })
//
//
// const result: APIResponseType = {
//     resultCode: ResultCodesEnum.Success,
//     messages: [],
//     data: {}
// }
//
// userAPIMock.follow.mockReturnValue(Promise.resolve(result));
// userAPIMock.unfollow.mockReturnValue(Promise.resolve(result));
//
//
// test('success follow thunk', async () => {
//     const thunk = follow(1)
//
//     await thunk(dispatchMock, getStateMock, {})
//
//     expect(dispatchMock).toBeCalledTimes(3)
//     expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toogleIsFollowingProgress(true, 1))
//     expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followAC(1))
//     expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toogleIsFollowingProgress(false, 1))
// })
//
// test('success unfollow thunk', async () => {
//     const thunk = unfollow(1)
//
//     await thunk(dispatchMock, getStateMock, {})
//
//     expect(dispatchMock).toBeCalledTimes(3)
//     expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toogleIsFollowingProgress(true, 1))
//     expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowAC(1))
//     expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toogleIsFollowingProgress(false, 1))
// })
