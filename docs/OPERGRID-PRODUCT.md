# OPERGRID Product Contract

## Identity

OPERGRID is an internal operational web platform.

It is not:

- SCADA;
- a command center;
- a collection of unrelated dashboards;
- a website that only displays information.

## Purpose

OPERGRID must help users complete operational work.

A module may support:

- structured data input;
- CRUD;
- master/reference data;
- operational workflow;
- review and approval;
- follow-up;
- analytics;
- audit history;
- reporting;
- PDF / spreadsheet output;
- integration with other OPERGRID modules.

## Core principle

Every module must solve a defined operational problem.

Do not add a feature only because it is technically possible.

## Shared data principle

Shared entities must be reusable across modules.

Examples:

- users;
- organization/scope;
- Functional Location;
- assets/equipment;
- voltage;
- operational status;
- reference data.

Avoid isolated copies of the same master data.

## Workflow principle

Workflow is contextual.

Different modules may have different workflows.

Examples:

- Gangguan / Manuver;
- Thermovision;
- Functional Location;
- User Management.

Do not force every module into one generic workflow.

## Functional Location boundary

Functional Location is primarily shared master/reference data.

Technical PST import, mapping, synchronization, and publishing are
administrative/integration concerns.

They must not dominate the normal Functional Location user experience.

## UX principle

Global UI, contextual workflow.

All modules must feel like one product while retaining domain-specific behavior.

## Development principle

OPERGRID is built incrementally.

Only implement behavior that has been agreed for the current feature.
