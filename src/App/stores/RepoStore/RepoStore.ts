import { CanceledError } from 'axios';
import { action, computed, makeObservable } from 'mobx';
import { GithubRepoAPI } from '~/shared/githubAPI';
import { ILocalStore } from '~/shared/hooks';
import { Nullable } from '~/shared/types';
import { isSome, toError } from '~/shared/utils';
import {
  ApiCommitStore,
  ApiRepoBranchesStore,
  ApiRepoContributorsStore,
  ApiRepoInfoStore,
  ApiRepoLangsStore,
  ApiRepoReadmeStore,
  ApiStore,
} from '../ApiStore';

type ApiStoresMap = {
  info: ApiRepoInfoStore;
  branches: ApiRepoBranchesStore;
  langs: ApiRepoLangsStore;
  contributors: ApiRepoContributorsStore;
  commit: ApiCommitStore;
  readme: ApiRepoReadmeStore;
};

type StoresStateMap = {
  [K in keyof ApiStoresMap]: ApiStoresMap[K]['state'];
};

export class RepoStore implements ILocalStore {
  private readonly _api: GithubRepoAPI;

  private readonly _storesMap: ApiStoresMap;

  constructor(orgName: string, repoName: string) {
    this._api = new GithubRepoAPI(orgName, repoName);

    this._storesMap = {
      info: new ApiRepoInfoStore(this._api),
      branches: new ApiRepoBranchesStore(this._api),
      langs: new ApiRepoLangsStore(this._api),
      contributors: new ApiRepoContributorsStore(this._api),
      commit: new ApiCommitStore(this._api),
      readme: new ApiRepoReadmeStore(this._api),
    };

    makeObservable<RepoStore>(this, {
      loading: computed,
      success: computed,
      error: computed,
      state: computed,
      fetch: action.bound,
      destroy: action.bound,
    });
  }

  private get _stores(): ApiStore[] {
    return Object.values(this._storesMap);
  }

  get loading(): boolean {
    return this._stores.some((store) => store.loading);
  }

  get success(): boolean {
    return this._stores.every((store) => store.success);
  }

  get error(): Nullable<Error> {
    return this._stores
      .map((store) => store.error)
      .find((error) => isSome(error));
  }

  get state(): StoresStateMap {
    return {
      info: this._storesMap.info.state,
      branches: this._storesMap.branches.state,
      langs: this._storesMap.langs.state,
      contributors: this._storesMap.contributors.state,
      commit: this._storesMap.commit.state,
      readme: this._storesMap.readme.state,
    };
  }

  async fetch(): Promise<void> {
    if (this.loading) {
      return;
    }

    return Promise.all(this._stores.map((store) => store.fetch({})))
      .catch((err) => {
        if (!(toError(err) instanceof CanceledError)) {
          console.error(err);
        }
      })
      .then(null);
  }

  stop(): void {
    this._stores.forEach((store) => store.stop());
  }

  reset(): void {
    this._stores.forEach((store) => store.reset());
  }

  destroy(): void {
    this.stop();
    this._stores.forEach((store) => store.destroy());
  }
}
