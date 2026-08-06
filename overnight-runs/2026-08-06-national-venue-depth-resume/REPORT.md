# Unattended National Venue-Depth Resume Report

## Outcome

In progress. This run resumes the national expansion from 476 facilities and 1,483 searchable spaces. Wave 1 is ready for final repository validation and public deployment.

## Changes

- Created a fresh run ledger from the verified public-data checkpoint.
- Added four official-source-backed Yamaguchi facilities and 33 searchable spaces, increasing the national total to 480 facilities and 1,516 spaces.
- Kept 67 ceiling observations in the recheck workflow; no new ceiling height was inferred from stage, proscenium, or building measurements.
- Added three available-room day-fee observations for 不二輸送機ホール. Published pricing for the currently unavailable 萩市民館大ホール remains out of searchable price data.
- Deployed the validated Wave 1 data to the existing public site (version 46) and confirmed the established custom domain returned the site response.

## Verification

- Wave audit passed with 0 errors and the pre-existing historical-record warning only. Generated app data contains 480 venues and 2,823 price observations.
- Current depth report: 695 candidate gaps and 917 space gaps. Yamaguchi is 11 candidates, 10 municipalities, and 59 spaces; Kochi, Oita, and Miyazaki are now the lowest-depth prefectures at 7 candidates.

## Pre-existing State Preserved

- Prior untracked overnight-run directories and `web-projects/` were not touched.

## Unverified States

- Future official-source rows, current price availability, and facility conditions remain to be researched in each wave. Missing ceiling values remain explicitly unknown rather than estimated.

## Blockers

- None.

## Morning Decisions

- None while the run remains active.
