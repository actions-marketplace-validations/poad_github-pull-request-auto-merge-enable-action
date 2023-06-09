"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const client_1 = __importStar(require("./client"));
require("source-map-support/register");
const run = async () => {
    const errHandler = (error) => {
        if (error instanceof Error) {
            core.error(error);
            core.setFailed(error);
            return;
        }
        const e = error instanceof Error ? error : JSON.stringify(error);
        core.error(e);
        core.setFailed(e);
    };
    try {
        const token = core.getInput('github_token');
        const pullRequestNumber = Number(core.getInput('pull_request_number'));
        const pullRequestId = core.getInput('pull_request_id');
        const owner = core.getInput('owner');
        const repo = core.getInput('repository');
        const mergeMethod = core.getInput('merge_method');
        core.info(`owner: ${owner}`);
        core.info(`repository: ${repo}`);
        core.info(`pull_request_number: ${pullRequestNumber}`);
        core.info(`pull_request_id: ${pullRequestId}`);
        core.info(`merge_method: ${mergeMethod}`);
        if (pullRequestNumber === 0 && !pullRequestId) {
            errHandler(new Error('pull_request_number or pull_request_id must be specified'));
        }
        const client = new client_1.default(token);
        const resp = !pullRequestId
            ? (await client.findPullRequestId({
                owner,
                repo: repo,
                number: pullRequestNumber
            }))
            : { id: pullRequestId };
        const { id, state } = resp || {};
        if (state !== 'OPEN') {
            core.warning(`target pull request state: ${state}`);
            return;
        }
        core.info(`target pull request id: ${id}`);
        if (id) {
            await client.enableAutoMerge(mergeMethod
                ? {
                    pullRequestId: id,
                    mergeMethod: client_1.MergeMethod.valueOf(mergeMethod)
                }
                : { pullRequestId: id });
        }
    }
    catch (error) {
        errHandler(error);
    }
};
Promise.resolve(run()).catch((error) => {
    core.error(error.stack ? error.stack?.toString() : error);
    core.setFailed(error);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBcUM7QUFDckMsbURBQWdFO0FBQ2hFLHVDQUFvQztBQUVwQyxNQUFNLEdBQUcsR0FBRyxLQUFLLElBQW1CLEVBQUU7SUFDcEMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFjLEVBQUUsRUFBRTtRQUNwQyxJQUFJLEtBQUssWUFBWSxLQUFLLEVBQUU7WUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3JCLE9BQU07U0FDUDtRQUNELE1BQU0sQ0FBQyxHQUFHLEtBQUssWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNoRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNuQixDQUFDLENBQUE7SUFDRCxJQUFJO1FBQ0YsTUFBTSxLQUFLLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUNuRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQTtRQUN0RSxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDdEQsTUFBTSxLQUFLLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUM1QyxNQUFNLElBQUksR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ2hELE1BQU0sV0FBVyxHQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUE7UUFFekQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssRUFBRSxDQUFDLENBQUE7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDLENBQUE7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsaUJBQWlCLEVBQUUsQ0FBQyxDQUFBO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLGFBQWEsRUFBRSxDQUFDLENBQUE7UUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsV0FBVyxFQUFFLENBQUMsQ0FBQTtRQUV6QyxJQUFJLGlCQUFpQixLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUM3QyxVQUFVLENBQ1IsSUFBSSxLQUFLLENBQUMsMERBQTBELENBQUMsQ0FDdEUsQ0FBQTtTQUNGO1FBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxnQkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3RDLE1BQU0sSUFBSSxHQUFHLENBQUMsYUFBYTtZQUN2QixDQUFDLENBQUMsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztnQkFDOUIsS0FBSztnQkFDTCxJQUFJLEVBQUUsSUFBSTtnQkFDVixNQUFNLEVBQUUsaUJBQWlCO2FBQzFCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBRSxhQUFhLEVBQUMsQ0FBQTtRQUV6QixNQUFNLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksSUFBSSxFQUFrQixDQUFBO1FBQ2hELElBQUksS0FBSyxLQUFLLE1BQU0sRUFBRTtZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLDhCQUE4QixLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ25ELE9BQU07U0FDUDtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFFMUMsSUFBSSxFQUFFLEVBQUU7WUFDTixNQUFNLE1BQU0sQ0FBQyxlQUFlLENBQzFCLFdBQVc7Z0JBQ1QsQ0FBQyxDQUFDO29CQUNGLGFBQWEsRUFBRSxFQUFFO29CQUNmLFdBQVcsRUFBRSxvQkFBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7aUJBQzlDO2dCQUNELENBQUMsQ0FBQyxFQUFFLGFBQWEsRUFBRSxFQUFFLEVBQUUsQ0FDMUIsQ0FBQTtTQUNGO0tBQ0Y7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUNsQjtBQUNILENBQUMsQ0FBQTtBQUVELE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRTtJQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3pELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDdkIsQ0FBQyxDQUFDLENBQUEifQ==